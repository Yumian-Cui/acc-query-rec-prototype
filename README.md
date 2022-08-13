# acc-query-rec-prototype

## Prototype 

You can find the prototype I drew out either in slack channel #acc-query-rec or our [project folder titled "Goals & Features & Prototype.pdf".](https://drive.google.com/drive/folders/1CMR0Xy9SCVJWOaz0WQ3Iwq-h4reKuRb1)

I created a [google doc](https://docs.google.com/document/d/1A5L7aOEzU7iMtNzmz5nYw6S9Tqn70izcrfP7t_s0Vgw/edit) to document our progress in one place; but you may also choose to send any updates in slack through our small group channel.

## Replit

You can edit your files in replit.com. It's an online IDE that allows you to write code and host our website in one place (click run and you will see rendered website instantly). It has shell integrated so you can do the terminal commands just like in your local. There are other alternatives. VS Code is a good option as well.

Here is the link: https://replit.com/@YumianCui/acc-query-rec-prototype \
Here is the tutorial: https://docs.replit.com/programming-ide/git-with-replit

---

**Important**: one downside of replit is if you close (or refresh) your tab, it may ask you to reenter your email and name like this

```
git config --global user.name "Jane Doe"
git config --global user.email "jane@example.com"
```

It is bothering so if you do use replit, better leave the page opened there and complete any edits in one sitting. 

another really important downside (writing to this point, I feel like replit is not for teamwork, but still write those down, I may use it occasionally) is that every time you commit or push it will ask for your GitHub name and password (PAT), to stop it, you can follow the tutorial https://docs.replit.com/programming-ide/git-with-replit#pushing-without-typing-in-your-password-or-access-token; however, then anyone with this link can have access to our sensitive info.

## Branching

Once you're in replit, you open ```Shell```, and I believe you will see ```~/acc-query-rec-prototype$```, you can pick either options below:

1. Go to left side bar click icon ```Version control```, and choose your branch from drop-down. Then if you go to ```Shell``` and enter ```git branch```, you will see your branch appearing. (I created your branch for you and then delete it from shell; it still shows up in the branch list which is annoying...anyway you can try step 1 first)
2. ```git checkout -b <name you like>``` (```-b``` auto switch to that branch after creating it) 
   
do any edits, add, commit, and then 

```git push -u origin <your branch>```

**if you don't like replit**, ignore above and in your local you can do 

```git clone https://github.com/Yumian-Cui/acc-query-rec-prototype.git``` \
```cd acc-query-rec-prototype``` \
```git checkout -b <name you like>``` 

After adding and commting with comments, you push to your own branch

```git push -u origin <your branch>```


