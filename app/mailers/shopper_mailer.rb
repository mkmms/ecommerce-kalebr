class ShopperMailer < ActionMailer::Base
  default from: ENV["MAILER_FROM"]
  layout 'mailer'

  def send_product(user, product)
    if product.file.present?
      attachments["#{product.file.file.filename}"] = product.file.read
    end
    mail(:to => user.email, :subject => product.title)
  end
end