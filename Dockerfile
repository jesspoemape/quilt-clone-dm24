FROM heropunch/minibase:latest
COPY . /srv/quizlet
WORKDIR /srv/quizlet
RUN make
ENTRYPOINT ["/bin/dumb-init", "npm"]
CMD ["run", "start:api"]