export const authConfig = {
    // secret: this.getValue('SECRET'),

    // refreshTokenSecret: this.getValue('REFRESH_TOKEN_SECRET'),

    /**
     * Token Lifetime in seconds
     *
     * Default: 15 days
     */
    tokenLife: 15 * 24 * 60 * 60,

    appTokenLife: 60,

    /**
     * Token Lifetime in seconds
     *
     * Default: 180 days
     */
    refreshTokenLife: 180 * 24 * 60 * 60,
};
