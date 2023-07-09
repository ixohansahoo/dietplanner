import smtplib as sm
obj=sm.SMTP("smtp.gmail.com",587)
obj.starttls()
obj.login("ssm.shubham415@gmail.com","chiku@chiku648")

sub="Time to have your meal"
boddy="It's time to have your next meal \n Hurry up"
msg="sub:{}\n\n{}".format(sub,boddy)
mail_list=["sohan.sahoo316@gmail.com","1941012426.n.sohankumarsahoo@gmail.com"]
obj.sendmail("ssm.shubham415",mail_list,msg)
print("sucessful")