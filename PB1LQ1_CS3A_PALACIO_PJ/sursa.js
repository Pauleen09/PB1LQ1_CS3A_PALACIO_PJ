let publickey;
let privatekey;

/* Message */
function showMessage(text, color = "black") {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.color = color;
}
/* Enrollmetn Data*/
function getEnrollmentData() {
    const fullName = document.getElementById("fullName").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const yearLevel = document.getElementById("yearLevel").value.trim();
    const gender = document.getElementById("gender").value;
    const userName = document.getElementById("userName").value.trim();
    const password = document.getElementById("password").value;

    /* Check if all fields are complete */
    if (
        !fullName ||
        !birthdate ||
        !yearLevel ||
        !gender ||
        !userName ||
        !password
    ) {
        showMessage(
            "Please complete all fields.",
            "red"
        );
        return null;
    }

    /* enrollment info stored */
    const user = {
        fullName: fullName,
        birthdate: birthdate,
        yearLevel: yearLevel,
        gender: gender,
        userName: userName,
        password: password
    };
    return user;
}

function generateRSAKeyPair(bits, callback) {
    const crypt =
        new JSEncrypt({
            default_key_size: bits
        });
    crypt.getKey(function() {
        publickey =
            crypt.getPublicKey();
        privatekey =
            crypt.getPrivateKey();
        callback();
    });
}

function encryptValue(value) {
    const crypt =
        new JSEncrypt();
    crypt.setPublicKey(publickey);
    return crypt.encrypt(value);
}

function decryptValue(value) {
    const crypt =
        new JSEncrypt();
    crypt.setPrivateKey(privatekey);
    return crypt.decrypt(value);
}

/*1024-BIT Encryption*/
function encrypt1024() {
    const user =
        getEnrollmentData();
    if (!user) {
        return;
    }

    showMessage(
        "Generating 1024-bit key...",
        "blue"
    );

    generateRSAKeyPair(1024, function() {

        /*Encrypt each field separately.*/
        const encrypted = {
            fullName: encryptValue(user.fullName),
            birthdate: encryptValue(user.birthdate),
            yearLevel: encryptValue(user.yearLevel),
            gender: encryptValue(user.gender),
            userName: encryptValue(user.userName),
            password: encryptValue(user.password)
        };

        /* Save encrypted data */
        localStorage.setItem(
            "rsaEncrypted1024",
            JSON.stringify(encrypted)
        );

        /* Display encrypted data */
        document.getElementById(
            "signupEncrypted"
        ).textContent =
            JSON.stringify(
                encrypted,
                null,
                4
            );

        showMessage(
            "1024-bit encryption successful!",
            "green"
        );

    });
}

/* 1024-BIT Decryption*/
function decrypt1024() {
    const storedData =
        localStorage.getItem(
            "rsaEncrypted1024"
        );

    /* Check if encryption was performed */
    if (!storedData || !privatekey) {
        showMessage(
            "Please Encrypt 1024-bit first.",
            "red"
        );
        return;
    }
    try {
        const encrypted =
            JSON.parse(storedData);

        /* Decrypt the data */
        const decrypted = {
            fullName: decryptValue(encrypted.fullName),
            birthdate: decryptValue(encrypted.birthdate),
            yearLevel: decryptValue(encrypted.yearLevel),
            gender: decryptValue(encrypted.gender),
            userName: decryptValue(encrypted.userName),
            password: decryptValue(encrypted.password)
        };

        /* Display decrypted data */
        document.getElementById(
            "signupDecrypted"
        ).textContent =
            JSON.stringify(
                decrypted,
                null,
                4
            );
        showMessage(
            "1024-bit decryption successful!",
            "green"
        );
    } catch (error) {
        showMessage(
            "Decryption failed.",
            "red"
        );
    }
}

/* 3072-BIT ENCRYPTION */
function encrypt3072() {
    const user =
        getEnrollmentData();
    if (!user) {
        return;
    }

    showMessage(
        "Generating 3072-bit key. Please wait...",
        "blue"
    );
    generateRSAKeyPair(3072, function() {

        /*Encrypt each field separately.*/
        const encrypted = {
            fullName: encryptValue(user.fullName),
            birthdate: encryptValue(user.birthdate),
            yearLevel: encryptValue(user.yearLevel),
            gender: encryptValue(user.gender),
            userName: encryptValue(user.userName),
            password:encryptValue(user.password)
        };

        /* Save encrypted data */
        localStorage.setItem(
            "rsaEncrypted3072",
            JSON.stringify(encrypted)
        );

        /* Display encrypted data */
        document.getElementById(
            "signupEncrypted"
        ).textContent =
            JSON.stringify(
                encrypted,
                null,
                4
            );

        showMessage(
            "3072-bit encryption successful!",
            "green"
        );

    });
}

/* 3072-BIT DECRYPTION */
function decrypt3072() {
    const storedData =
        localStorage.getItem(
            "rsaEncrypted3072"
        );

    /* Check if encryption was performed */
    if (!storedData || !privatekey) {
        showMessage(
            "Please Encrypt 3072-bit first.",
            "red"
        );
        return;
    }
    try {
        const encrypted =
            JSON.parse(storedData);

        /* Decrypt the data */
        const decrypted = {
            fullName: decryptValue(encrypted.fullName),
            birthdate: decryptValue(encrypted.birthdate),
            yearLevel: decryptValue(encrypted.yearLevel),
            gender: decryptValue(encrypted.gender),
            userName: decryptValue(encrypted.userName),
            password: decryptValue(encrypted.password)
        };

        /* Display decrypted data */
        document.getElementById(
            "signupDecrypted"
        ).textContent =
            JSON.stringify(
                decrypted,
                null,
                4
            );

        showMessage(
            " 3072-bit decryption successful!",
            "green"
        );
    } catch (error) {
        showMessage(
            "Decryption failed.",
            "red"
        );
    }
}