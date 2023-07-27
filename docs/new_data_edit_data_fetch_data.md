# Fetch data
I moved functions to fetch various data into its own javascript model

Again as usual working with asynchronous function is super tricky.

I could define asynchronous fetchBusinesses function let's say.

But then in the component to actually capture its result and set it to some state variable I had to define yet another asynchronous function called ```fetchData``` within ```useEffect``` and then call it. 

Within ```fetchData``` I would use ```await``` in front of ```fetchBusinesses``` and only then run ```setBusinesses```
that was how I could ensure ```businesses``` state actually gets set

# New data as Route
I used subroute to show ```AssetAccountNameNew``` component with the form. When I submit the form it creates a new asset account name and ```navigate```s to parent component which in turn helps refresh list of account names in the table

# Edit or delete data as Route
In a similar manner, I made ```handleClick``` function which I pass as ```props``` to ```DataTable``` component which in turn triggers when ```onRowClicked``` event fires.
Within ```handleClick``` I ```navigate``` to ```AssetAccountNameEdit``` component