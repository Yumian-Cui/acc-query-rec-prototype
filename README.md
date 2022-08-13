# acc-query-rec-prototype

## Prototype 

You can find the prototype I drew out either in slack channel #acc-query-rec or our [project folder titled "Goals & Features & Prototype.pdf".](https://drive.google.com/drive/folders/1CMR0Xy9SCVJWOaz0WQ3Iwq-h4reKuRb1)

I created a [google doc](https://docs.google.com/document/d/1A5L7aOEzU7iMtNzmz5nYw6S9Tqn70izcrfP7t_s0Vgw/edit) to document our progress in one place; but you may also choose to send any updates in slack through our small group channel.

## Replit

You can edit your files in replit.com. It's an online IDE that allows you to write code and host our website in one place (click run and you will see rendered website instantly). It has shell integrated so you can do the terminal commands just like in your local. There are other alternatives. VS Code is a good option as well. You can switch between IDEs as you like. 

If you want to use replit:

1. Go to https://replit.com/~, sign up or log in. 
2. **Important**: *ask me to set the GitHub repo as public temporarily*
3. Go to ```My Repls```, (optional: create a new folder) and then click top right corner + icon, choose ```Import from GitHub```, paste ```https://github.com/Yumian-Cui/acc-query-rec-prototype.git```. Create your replit.
4. **Important**: *notify me you're done with step 3 so I can set repo back to private*
5. Go ahead and follow the steps in *Branching* section: "Once you're in replit,..."

---

**Important**: 

one downside of replit is if you close (or refresh, or inactivity for too long?) your tab, it may ask you to reenter your email and name like this

```
git config --global user.name "Jane Doe"
git config --global user.email "jane@example.com"
```

It is bothering, so if you do use replit, better leave the page opened there and complete any edits in one sitting. 

another thing is that every time you pull from origin or push your commits **from Shell** it will ask for your GitHub name and password (PAT), there's not really way to stop it, so all you can do is to reduce the number of pulls or pushes **if you use Shell to do the git operations**. Otherwise, for simple commit and push, consider using left sidebar ```Version control``` icon, write your comments, and click ```Commit All & Push``` (be sure you're in your branch).

## Branching

Once you're in replit, you open ```Shell```, and you will see ```~/acc-query-rec-prototype$```, you can do

1. ```git checkout -b <name you like>``` (```-b``` auto switch to that branch after creating it)
2. Add edited file(s) and commting with comments. (refer to last section last paragraph --- "Otherwise, for simple commit and push...")
3. ```git push -u origin <your branch>```

---

**if you don't like replit**, I believe in your local you can do

1. ```git clone https://github.com/Yumian-Cui/acc-query-rec-prototype.git```
2. ```cd acc-query-rec-prototype```
3. ```git checkout -b <name you like>``` 
<br> The subsequent steps are same as pointed above, except now you will use git commands to add and commit edited file(s.)

--- 

After first time creating your branch, next time before you start working, you can just do ```git checkout <your branch>``` to switch to your branch.

```git status``` is an useful command to check on which git operations to perform next.




