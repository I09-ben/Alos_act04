FROM node:6.9

ADD . /app

RUN cd /app; \
    npm install --production

EXPOSE 8123

CMD ["node", "/app/index.js"]