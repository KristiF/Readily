import requests
from newspaper import Article
import json
import firebase_admin
from google.cloud import firestore
from firebase_admin import credentials
from firebase_admin import storage
import uuid
from os import remove, listdir
import openai

def classify(title):
    with open("api-data.json") as f:
        openai.api_key = json.load(f)["openai-key"]
    resp = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Categorize the following text: {title} into one of the following categories: news, sport, entertainment, economy, politics, tech, world",
        max_tokens=7,
        temperature=0
    )
    return resp["choices"][0]["text"].strip()

def fetch_article_links():
    with open("api-data.json") as f:
        api_data = json.load(f)
        api_key = api_data["newsapi-key"]
    url = "https://newsapi.org/v2/top-headlines?"
    country_codes = ["se", "us"]
    links = []
    for country_code in country_codes:
        request_url = f"{url}country={country_code}&apiKey={api_key}"
        response = requests.request(method="GET", url=request_url).json()
        for article in response["articles"]:
            links.append(article["url"])
    return links

def fetch_image(img_link):
    image_name = f"{str(uuid.uuid5(uuid.NAMESPACE_URL, img_link))}.jpg"
    try:
        response = requests.get(img_link)
    except:
        return
    if response.status_code == 200:
        with open(f"images/{image_name}", 'wb') as f:
            f.write(response.content) 
    else:
        return False
    return image_name



def init_firebase():
    cred = credentials.Certificate('google-private-key.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'readify-a88ee.appspot.com'
    })

def upload_images():
    bucket = storage.bucket()
    for image in listdir("images"):
        blob = bucket.blob(f"images/{image}")
        blob.upload_from_filename(f"images/{image}")
        remove(f"images/{image}")
    print("Successfully pushed images to firebase")

def main():
    init_firebase()
    article_links = fetch_article_links()
    db = firestore.Client("readify-a88ee")
    for link in article_links:
        try:
            article = Article(link)
            article.download()
            article.parse()
            article.nlp()
        except:
            continue
        image = fetch_image(article.top_image)
        if len(article.text) < 700:
            continue
        if not image:
            continue
        article_data = {
            "id": str(uuid.uuid5(uuid.NAMESPACE_URL, link)),
            "url": link,
            "title":article.title,
            "content":article.text,
            "keywords":article.keywords,
            "image":fetch_image(article.top_image),
            "date":article.publish_date,
            "summary":article.summary,
            "category":classify(article.title)
        }
        db.collection("articles").add(article_data)
        print("Article pushed to DB:", link)
    
    upload_images()
    
if __name__ == "__main__":
    main()