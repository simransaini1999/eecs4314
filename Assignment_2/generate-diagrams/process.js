const fs = require("fs");
const config = require("./config");
const { loadRawTAFile, flatten } = require("./utils");

const getPatterns = (structure) => {
  let patterns = [];

  if (!structure.subsystems) {
    patterns = [structure.dir.replace("*", "")];
  } else {
    patterns = [];
    for (const s of structure.subsystems) {
      patterns.push(getPatterns(s));
    }
  }

  return flatten(patterns);
};

const formatSubsystems = (structure) => {
  let formatted = `$INSTANCE ${structure.name} cSubSystem\n`;

  if (structure.subsystems) {
    for (const s of structure.subsystems) {
      formatted += formatSubsystems(s);
    }
  }

  return formatted;
};

const filterAndFormatContent = (content) => {
  const contentLines = content.replace('"', "").replace("\\", "/").split("\n");

  let patterns = getPatterns(config.structure);

  const newContent = [];

  for (const line of contentLines) {
    const file = line.split(" ")[1];
    if (
      line.length >= 2 &&
      patterns.map((p) => file.includes(p)).includes(true)
    ) {
      newContent.push(line);
    }
  }

  return newContent.join("\n");
};

const main = () => {
  const rawTAFile = loadRawTAFile();

  const subsytemsContent = formatSubsystems(config.structure);
  let modifiedContent = filterAndFormatContent(rawTAFile);

  modifiedContent = `FACT TUPLE :\n${subsytemsContent}\n${modifiedContent}`;

  fs.writeFileSync(config.env.output.filteredDependency, modifiedContent);
};

main();
