# build
docker buildx build --platform linux/amd64,linux/arm64 . -t msbuildth-wordcloud:v0.0.1

# run
docker run -d -p 8080:8080 -e 'PORT=8080' msbuildth-wordcloud:v0.0.1