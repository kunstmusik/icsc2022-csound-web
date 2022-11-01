---
sidebar_position: 5
---

# Tutorial 4 - FileSystem

The browser filesystem as seen and used by Csound is permissionless and very stripped down version of the nodejs fs module. The filesystem operators are in face bare minimum interfaces required to write and read from the filesystem. As of today the filesystem operators are the following:

```js
await csound.fs.writeFile(path, data);
await csound.fs.appendFile(path, data);
const data = await csound.fs.readFile(path);
await csound.fs.unlink(path, data); // aka remove
const filePaths = await csound.fs.readdir(path);
await csound.fs.mkdir(path);
```

For best experience, we recommend writing files before starting csound and reading files after csound has finished running. While it may be possible to interact with the filesystem while csound is running, it has not been well tested.

All files in csound filesystem are represented in UInt8Array binary array format. This applies for binary files such as audio as well as textfiles. The browser has builting tools to convert this binary array format to File or textstring as we shall explain.

- How to use it
- Loading files onto the filesystem
- Use Case: Resources (soundfonts and samples)
- Use Case: Complex Csound Projects
