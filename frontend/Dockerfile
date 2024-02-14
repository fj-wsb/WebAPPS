FROM node:18
WORKDIR /app
COPY . .
RUN npm install
COPY . .
EXPOSE 3000
ENV BACKEND_HOST=backend
ENTRYPOINT [ "npm", "start" ]