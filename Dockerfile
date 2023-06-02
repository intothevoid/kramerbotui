FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --include=dev --silent
COPY . .
EXPOSE 5173 9229
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "dev"]

