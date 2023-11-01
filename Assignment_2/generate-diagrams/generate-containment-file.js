const fs = require("fs");

const { loadRawTAFile } = require("./utils");
const config = require("./config");

const buildDependencies = () => {
  const dependencies = [];

  const rawTAFile = loadRawTAFile();

  const lines = rawTAFile.split("\n");

  for (const l of lines) {
    const line = l.trim();

    if (!line) {
      continue;
    }

    const [type, file] = line.split(" ");

    if (type === "$INSTANCE") {
      dependencies.push(file.replace('"', ""));
    }
  }

  return dependencies;
};

const matchSubsystem = (dependency, structure) => {
  let match = false;

  if (structure.subsystems) {
    for (const s of structure.subsystems) {
      match = matchSubsystem(dependency, s);

      if (match) {
        break;
      }
    }
  } else {
    if (!match && dependency.includes(structure.dir)) {
      match = structure.name;
    }
  }

  return match;
};

const recursivelyGenerateContainmentInfo = (structure, parent) => {
  if (!structure.subsystems) {
    return `contain ${parent.name} ${structure.name}\n`;
  } else {
    let acc = "";

    for (const s of structure.subsystems) {
      acc += recursivelyGenerateContainmentInfo(s, structure);
    }

    return acc;
  }
};

const generateContainmentFile = () => {
  const dependencies = buildDependencies();
  let contents = "";

  contents += recursivelyGenerateContainmentInfo(config.structure);
  contents += "\n";

  dependencies.forEach((dependency) => {
    const subsystem = matchSubsystem(dependency, config.structure);
    if (subsystem) {
      contents += `contain ${subsystem} ${dependency}\n`;
    }
  });

  fs.writeFileSync(config.env.output.containment, contents);
};

const main = () => {
  generateContainmentFile();
};

main();
