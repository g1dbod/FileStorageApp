import express from 'express'
import userRouter from './modules/userModule/user.router';
import corsMiddleware from './middlewares/cors.middleware';
import userService from './services/user.service';

import dotenv from 'dotenv'
import fileRouter from './modules/fileModule/file.router';
import fileService from './services/file.service';
import prisma from './prisma/db';
dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(corsMiddleware)
app.use('/api/user', userRouter)
app.use('/api/file', fileRouter)

app.listen(port, async () => {
    console.log(`Running on port ${port}`)
    const god = await userService.createUser({email: '@god', password:'1234', fio:'GOD', role:'GOD'})
    if (god.user) {
        await fileService.createDir({
              userId: god.user.id,
            },
          )
    }
});