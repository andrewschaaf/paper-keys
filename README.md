
## Installing

<pre>
npm install paper-keys
</pre>

## Using

<pre>
paper-keys --new-bitcoin-key > foo.svg
</pre>

<pre>
echo '{"private64":"...","public64":"...","bitcoin_address"}' > json
cat json | paper-keys --from-json > foo.svg
</pre>

[Inkscape](http://inkscape.org/) can print SVGs.
