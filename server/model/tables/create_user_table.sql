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
    -- Contact Details
    commercial_name VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    type VARCHAR(255), -- supplier, customer
    category VARCHAR(255), -- cowork, nomad, meeting-room, virtual office
    status VARCHAR(255), -- converted, potential, rejected, waiting list, contacted, visitor
    -- Billing Address
    address VARCHAR(255),
    post_code VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    -- Billing Details
    registered_name VARCHAR(255),
    vat VARCHAR(255),
    payment_method VARCHAR(255), -- card, bank transfer, bank charge
    -- Additional Data
    additional_data TEXT
);