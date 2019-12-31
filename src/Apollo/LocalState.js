export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
}

export const resolvers = {
    Mutation: {
        logUserIn: (_, {token}, {cashe}) => {
            localStorage.setItem("token", token)
            cashe.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cashe}) => {
            localStorage.removeItem("token");
            window.location.reload();
            return null
        }
    }
}