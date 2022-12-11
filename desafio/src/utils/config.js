import dotenv from 'dotenv';
dotenv.config();

export const config = {
    
    isAdmin: true,

    atlas: {
        strConn: `mongodb+srv://Lautaro:batman123@cluster0.jfywafn.mongodb.net/proyectoFinal?retryWrites=true&w=majority`
    },

    server: {
        PERS: process.env.PERS,
        SECRET_KEY: process.env.SECRET_KEY,
        MONGO_URL: process.env.MONGO_URL,
        ENVIRONMENT: process.env.ENVIRONMENT
    },


}