module.exports = function(part, data) {
    const root = { name: '<root>', size: 0, dirs: {} }

    let cwd = root
    data.split('\n').forEach(line => {
        if (line[0] === '$') {
            const [_, cmd, ...args] = line.split(' ')
            switch (cmd) {
            case 'ls':
                break
            case 'cd':
                if (args[0] === '..') {
                    cwd = cwd.parent
                } else {
                    cwd = touchChildNode(cwd, args[0])
                }
                break
            }
        } else {
            const [sz, name] = line.split(' ')
            if (sz === 'dir') {
                touchChildNode(cwd, name)
            } else {
                const child = touchChildNode(cwd, name, false)
                child.size = +sz
            }
        }
    })
    let ans = 0
    const ds = []
    dfs(root)
    console.log(ans)
    // part 2
    const gap = 30000000 - (70000000 - root.size)
    console.log('gap:', gap)
    ds.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < ds.length; i++) {
        if (ds[i][0] >= gap) {
            console.log('delete size:', ds[i][0])
            break
        }
    }

    function dfs(r) {
        let size = r.size
        for (let name in r.dirs) {
            size += dfs(r.dirs[name])
        }
        if (r.isd) {
            if (size <= 100000) ans += size
            ds.push([size, r.name])
        }
        return r.size = size
    }
}
function touchChildNode(cwd, name, isd = true) {
    if (!cwd.dirs[name]) {
        const child = { name, size: 0, dirs: {}, parent: cwd, isd }
        cwd.dirs[name] = child
    }
    return cwd.dirs[name]
}
