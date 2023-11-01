module.exports = {
  env: {
    raw: "lib/flink_UnderstandFileDependency.raw.ta",
    output: {
      containment: "./out/flink.contain",
      filteredDependency: "./out/flink_UnderstandFileDependency.filtered.ta",
    },
  },
  structure: {
    name: "Flink",
    dir: "flink-1.17.1/",
    subsystems: [
      { name: "Core", dir: "flink-core/" },
      {
        name: "Runtime",
        dir: "flink-runtime/",
        subsystems: [
          {
            name: "JobManagers",
            dir: "flink-runtime/src/main/java/org/apache/runtime/jobmanager/",
          },
          {
            name: "JobMaster",
            dir: "flink-runtime/src/main/java/org/apache/runtime/jobmaster/",
          },
          {
            name: "ResourceManager",
            dir: "flink-runtime/src/main/java/org/apache/runtime/resourcemanager/",
          },
          {
            name: "Dispatcher",
            dir: "flink-runtime/src/main/java/org/apache/runtime/dispatcher/",
          },
          {
            name: "TaskManager",
            dir: "flink-runtime/src/main/java/org/apache/runtime/taskmanager/",
          },
          {
            name: "TaskExecutor",
            dir: "flink-runtime/src/main/java/org/apache/runtime/taskexecutor/",
          },
          {
            name: "State",
            dir: "flink-runtime/src/main/java/org/apache/runtime/state/",
          },
          {
            name: "Checkpoint",
            dir: "flink-runtime/src/main/java/org/apache/runtime/checkpoint/",
          },
        ],
      },
      { name: "Streaming", dir: "flink-streaming-java/" },
      { name: "Backends", dir: "flink-state-backends/" },
      { name: "Connectors", dir: "flink-connectors/" },
      { name: "Table", dir: "flink-table/" },
      {
        name: "Client",
        dir: "flink-clients/src/main/java/org/apache/client/",
      },
    ],
  },
};
