I was trying to do simple thing where I create a new asset account names and want to refresh ```assetAccountNames``` via
```fetchAssetAccountNames``` asyncronous function.

Well first I have to ensure that I ran ```fetchAssetAccountNames``` after creation of new asset account name completes and returns

Next in ```DataTable``` I had to add ```useEffect``` which depends on ```data``` props and ```setRows``` whenever ```data``` changes