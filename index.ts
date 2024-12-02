import { Sequelize, DataTypes, Model } from 'sequelize'
import * as dotoenv from 'dotenv'
dotoenv.config();
const db_key = process.env.DB_RELACIONAL_KEY

const sequelize = new Sequelize(`postgresql://neondb_owner:${db_key}@ep-jolly-recipe-a5kn4ubu.us-east-2.aws.neon.tech/neondb?sslmode=require`);


(async () => {
    //PRIMERO CREO EL MODEL, LUEGO ME CONECTO Y LE ESPECIFICO CON .SYNC ALTER{TRUE} Y POR ULTIMO REALIZO LAS QUERYS
    
    class User extends Model {};
    
    User.init({
      username: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthday: DataTypes.DATEONLY
    },{
      sequelize, // We need to pass the connection instance
      modelName: 'user', // We need to choose the model name
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
    await sequelize.sync({alter : true});


    const pruebaUser = await User.create({ 
        username : "pruebausername3", 
        lastname : "pruebalastname3", 
        birthday : "1993-03-03" 
    });
    console.log("User creado : ", pruebaUser.toJSON());

    const userCreados = await User.findAll();
    console.log(userCreados.map(elemento => elemento.dataValues))
})();