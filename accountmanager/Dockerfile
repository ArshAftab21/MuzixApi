FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=musicdb
ENV MYSQL_USER=musicroot
ENV MYSQL_PASSWORD=root1
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/musicdb
ADD ./target/accountmanager-1.0.jar /usr/src/accountmanager-1.0.jar
ENTRYPOINT ["java","-jar","accountmanager-1.0.jar"]
