# Recommended GitHub settings
These settings are recommended to keep your CI process running smoothly, with a balance of gate keeping to ensure quality
standards are met, but also not so many gates that integration is slowed down.

Remember
Go to the **Settings > General** tab of the repo
- [ ] Base branch should be named `main`
- [ ] Disable all features in the **Features** tab unless you plan to use them
- [ ] Uncheck **"Allow squash merging"** and **"Allow rebase merging"**.
- [ ] Check **"Always suggest updating pull request branches"**, **"Allow auto-merge"** and **"Automatically delete head branches"**.

Go to **Settings > Branches** and add a new branch protection rule for `main`
- [ ] Check **"Require pull request reviews before merging"**
- [ ] Check **"Require approvals"** and keep value at 1.
- [ ] Check **"Require review from Code Owners"** (It's up to your team to decide on ownership boundaries if any)
- [ ] Check **"Require status checks to pass before merging"** and **"Require branches to be up to date before merging"**
- [ ] Add **build-affect**, **lint-affected**, **package-affected**, **test-affected** as required status checks (Note: you will have needed to run these for them to show up
- [ ] Press **Save changes**
