CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    confirmation_token VARCHAR(255),
    email_confirmed BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    commercial_name VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    type VARCHAR(255), -- supplier, customer
    category VARCHAR(255), -- cowork, meeting room, virtual office
    status VARCHAR(255), -- converted, potential, rejected, waiting list, contacted, visitor
    address VARCHAR(255),
    post_code VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    registered_name VARCHAR(255),
    vat VARCHAR(255),
    payment_method VARCHAR(255), -- card, bank transfer, bank charge
    additional_data TEXT
    city VARCHAR(255),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
/* this is the select to bring the convertidos */
SELECT 
    id, 
    Email1 AS email, 
    NULL AS password, 
    NULL AS google_id, 
    NULL AS confirmation_token, 
    FALSE AS email_confirmed, 
    FALSE AS is_admin, 
    NULL AS commercial_name, 
    Nombre AS name, 
    Telefono1 AS phone, 
    CASE 
        WHEN Tipo = 'Usuario Mesa' THEN 'Cowork' 
        WHEN Tipo = 'Usuario Aulas' THEN 'Meeting Room' 
        WHEN Tipo = 'Usuario Virtual' THEN 'Virtual Office' 
        ELSE NULL 
    END AS type, 
    NULL AS category,
    CASE 
        WHEN Estado = 'Convertido' THEN 'Active' 
        ELSE 'Inactive' 
    END AS status, 
    DireccionF AS address, 
    CPF AS post_code, 
    ProvinciaF AS state, 
    PaisF AS country, 
    NombreF AS registered_name, 
    NIFF AS vat, 
    NULL AS payment_method, 
    Observaciones AS additional_data,
    LocalidadF AS city,
    FechaAltaPropietario AS created
FROM propietario
WHERE Estado = 'Convertido';

/* insert from temp_table to users*/

SELECT 
    id, 
    Email1 AS email, 
    NULL AS password, 
    NULL AS google_id, 
    NULL AS confirmation_token, 
    FALSE AS email_confirmed, 
    FALSE AS is_admin, 
    NULL AS commercial_name, 
    Nombre AS name, 
    Telefono1 AS phone, 
    CASE 
        WHEN Tipo = 'Usuario Mesa' THEN 'Cowork' 
        WHEN Tipo = 'Usuario Aulas' THEN 'Meeting Room' 
        WHEN Tipo = 'Usuario Virtual' THEN 'Virtual Office' 
        ELSE NULL 
    END AS category, 
    CASE 
        WHEN Estado = 'Convertido' THEN 'Active' 
        ELSE 'Inactive' 
    END AS status, 
    DireccionF AS address, 
    CPF AS post_code, 
    ProviciaF AS state, 
    PaisF AS country, 
    NombreF AS registered_name, 
    NIFF AS vat, 
    NULL AS payment_method, 
    NULL AS additional_data 
FROM propietario;


INSERT INTO users (
    email, 
    password, 
    google_id, 
    confirmation_token, 
    email_confirmed, 
    is_admin,
    commercial_name,
    name,
    phone,
    type,
    category,
    status,
    address,
    post_code,
    state,
    country,
    registered_name,
    vat,
    payment_method,
    additional_data,
    city,
    created
)
SELECT 
    email, 
    COALESCE(password, md5(random()::text)), 
    google_id, 
    confirmation_token, 
    email_confirmed, 
    is_admin,
    commercial_name,
    name,
    phone,
    type,
    category,
    status,
    address,
    post_code,
    state,
    country,
    registered_name,
    vat,
    payment_method,
    additional_data,
    city,
    CURRENT_TIMESTAMP
FROM temp_users
WHERE email NOT IN (
    'antoniojc@serviciosintegralesdeingenieria.es',
    'bugue@forjaroja.com',
    'danielmartinvegas@gmail.com',
    'dyakova.evgenia@gmail.com',
    'fab5533@icloud.com',
    'info@be-working.com',
    'info@blaircentre.com',
    'info@virtualandgo.com',
    'juanjosumiller@gmail.com',
    'marume83@gmail.com',
    'rsendic@holocorp.com',
    'zoltandali1@gmail.com',
    'jose@manaager.com',
    'jose.molina.talavera@gmail.com'
) AND email NOT IN (
    SELECT email FROM users
);