import dropbox
dbx = dropbox.Dropbox("cKG3HoKEj5UAAAAAAABOIPdWvWMDanbCaQP_5q5Sd-NbI9CpIDPCFeZN0EI2xCUa")
dbx.users_get_current_account()
link = dbx.files_get_temporary_link('/Floor1.jpg')
print(link)