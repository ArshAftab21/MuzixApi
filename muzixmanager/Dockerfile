FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=musicdb
ENV MYSQL_USER=musicroot
ENV MYSQL_PASSWORD=root1
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/musicdb
ADD ./target/muzixmanager-0.0.1-SNAPSHOT.jar /usr/src/muzixmanager-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","muzixmanager-0.0.1-SNAPSHOT.jar"]
