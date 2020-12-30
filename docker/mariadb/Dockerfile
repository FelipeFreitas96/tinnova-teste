FROM mariadb:latest
ENV PACKAGES openssh-server openssh-client
RUN apt-get update && apt-get install -y $PACKAGES
RUN sed -i 's|^#PermitRootLogin.*|PermitRootLogin yes|g' /etc/ssh/sshd_config
RUN echo "root:123123" | chpasswd