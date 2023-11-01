# Clear all generated files
rm -r out
mkdir out

# Create .contain file and streamlined .ta file
node ./generate-containment-file.js
node ./process.js

# Create .con.ta file and .ls.ta file
# Open LSEdit and load .ls.ta file
sh createContainment.sh
sh runLSEdit.sh