import {createNextAuthMiddleware} from 'nextjs-basic-auth-middleware'

export const middleware = createNextAuthMiddleware({
    users: [
        {
            name: "artevide",
            password: "hr51kif16"
        }
    ]
})

export const config = {
    matcher: ['/(.*)'],
}