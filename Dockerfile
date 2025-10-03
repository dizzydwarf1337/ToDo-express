FROM node:latest
WORKDIR /newtest
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "bin/www"]