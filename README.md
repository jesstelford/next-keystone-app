# Static Sites with Next.js & KeystoneJS

## How to use

### Deploy your Keystone instance

This demo is based on the [Keystone JAMStack Plus starter kit](https://github.com/keystonejs/keystone-jamstack-plus).

Click the Deploy button there to get an instance up and running.

### Update your Keystone URL

In this codebase, edit `lib/apollo.js` and alter the `KEYSTONE_URI` to point to
your Keystone instances API (note this should be the url ending in
`/admin/api`).

### Add some data

In your Keystone instance's Admin UI, create a couple of pages.

### Build Static Pages

```
yarn build
```

This will automatically build static html for every Page you created in Keystone
(plus the index page).

### Try it out

```
yarn start
```

Visit [`http://localhost:3000`](http://localhost:3000) to see the static
generated pages.

## Credits

- This demo is based on the [`with-apollo` Next.js example](https://github.com/zeit/next.js/tree/canary/examples/with-apollo).
- Wouldn't be possible without the Next.js team's hard work on [`unstable_getStaticPaths` & `unstable_getStaticProps`](https://github.com/zeit/next.js/issues/9524)!
- The [KeystoneJS team](https://keystonejs.com) for a great headless CMS
