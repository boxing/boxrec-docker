import * as dotenv from 'dotenv';

dotenv.load();

// easy way to extract the required vars for testing and test that they exist
const {PHPSESSID, REMEMBERME} = process.env;

if (!PHPSESSID || !REMEMBERME) {
    throw new Error('Missing PHPSESSID or REMEMBERME');
}

export {
    PHPSESSID,
    REMEMBERME,
};
