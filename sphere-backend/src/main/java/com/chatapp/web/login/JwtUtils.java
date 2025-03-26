package com.chatapp.web.login;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    
    @Value("${jst.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private int jwtExpirationMs;

    /**
     * Generate  Jwt token from a username
     */
    
     public  String generateJwtToken(String username){

        String token =  JWT.create()
            .withSubject(username)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date((new Date()). getTime() + jwtExpirationMs))
            .sign(Algorithm.HMAC256(jwtSecret));
            return token;
     }

     /** 
      * Extracts the username from the JWT token
      */

      public String getUsernameFromJwtToken(String token) {

        try {
            return JWT.require(Algorithm.HMAC256(jwtSecret))
                .build()
                .verify(token)
                .getSubject();
        } catch (JWTVerificationException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            return null;
        }
      }

      /**
       * Validates a JWT token
       */

      public boolean validateJwtToken(String token) {
            try {
                JWT.require(Algorithm.HMAC256(jwtSecret))
                    .build()
                    .verify(token);
                return true;
            } catch (JWTVerificationException e) {
                logger.error("Invalid JWT token: {}", e.getMessage());
            }
            return false;
      }

      /**
       * Extracts the expiration date from a JWT token
       */

       public Date getExpriationDateFromJwtToken(String token) {
            try {
                return JWT.require(Algorithm.HMAC256(jwtSecret))
                    .build()
                    .verify(token)
                    .getExpiresAt();
            } catch (JWTVerificationException e) {
                logger.error("Invalid JWT token: {}", e.getMessage());
            }
            return null;
       }

       /**
        * check if a JWT token has expired
        */

        public boolean isTokenExpired(String token) {
            Date expiration = getExpriationDateFromJwtToken(token);
            return expiration != null && expiration.before(new Date());
        }


}
