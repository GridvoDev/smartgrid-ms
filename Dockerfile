FROM node:latest
MAINTAINER linmadan <772181827@qq.com>
COPY ./package.json /home/smartgrid-ms/
WORKDIR /home/smartgrid-ms
RUN ["npm","config","set","registry","http://registry.npm.taobao.org"]
RUN ["npm","install","--save-dev","mocha@3.2.0"]
RUN ["npm","install","--save-dev","muk@0.5.3"]
RUN ["npm","install","--save-dev","should@11.1.2"]
RUN ["npm","install","--save-dev","mqtt@2.2.1"]
RUN ["npm","install","--save-dev","express@4.14.0"]
RUN ["npm","install","--save","co@4.6.0"]
RUN ["npm","install","--save","body-parser@1.15.1"]
RUN ["npm","install","--save","kafka-node@1.3.0"]
RUN ["npm","install","--save","rest@2.0.0"]
RUN ["npm","install","--save","pomelo@2.0.0"]
RUN ["npm","install","--save","underscore@1.8.3"]
RUN ["npm","install","--save","gridvo-common-js@0.0.19"]
COPY ./app.js app.js
COPY ./lib lib
COPY ./test test
VOLUME ["/home/smartgrid-ms"]
ENTRYPOINT ["node"]
CMD ["app.js"]