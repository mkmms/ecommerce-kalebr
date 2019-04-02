p '=== Initiating to Clear User Table ==='
User.destroy_all
p '== User Table Cleared ==='

p '== Creating Admin User ==='
User.create(name: 'Admin', email: 'admin@gmail.com', mobile: '8861869419', role: 'admin', password: 'Admin@123', password_confirmation: 'Admin@123')
p '=== Admin User Created ==='
