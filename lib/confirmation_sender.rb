module ConfirmationSender
  def self.send_confirmation_to(user, order)
    verification_code = CodeGenerator.generate
    order.update(verification_code: verification_code)
    MessageSender.send_code("+91" + user.mobile.to_s, verification_code)
  end
end