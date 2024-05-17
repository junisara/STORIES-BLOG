FROM gatsbyjs/gatsby:onbuild as build

FROM gatsbyjs/gatsby
# COPY --from=build /public /pub
ADD /public /pub



# FROM node:18-alpine 
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# RUN yarn global add gatsby-cli

# # Install dependencies based on the preferred package manager
# COPY package.json ./
# COPY .cache ./.cache
# COPY public ./public
# RUN  yarn 

# EXPOSE 9000

# CMD ["yarn","serve"]




