module.exports = function(part, data) {
    const bags = {}
    function newBag(str) {
        if (!bags[str]) {
            bags[str] = {
                str, children: {}, parents: {}
            }
        }
        return bags[str]
    }

    data.split('\n').forEach(line => {
        // mirrored silver bags contain 4 pale cyan bags, 1 bright bronze bag, 1 mirrored blue bag.
        const [left, right] = line.split('contain')
        if (right === ' no other bags.') return

        const pstr = left.split(' bags')[0]
        const p = newBag(pstr)
        right.split(',').map(token => {
            const [_, num, cstr] = /(\d)+ (.+) bag/.exec(token)
            const c = newBag(cstr)
            p.children[cstr] = {
                num: +num,
                node: c
            }
            c.parents[pstr] = p
        })
    })

    let result
    if (part == 1) {
        const visited = {}
        const q = [bags['shiny gold']]
        while (q.length) {
            const node = q.shift()
            if (visited[node.str]) continue
            visited[node.str] = 1

            for (let pstr in node.parents) {
                q.push(node.parents[pstr])
            }
        }
        result = Object.keys(visited).length - 1
    } else {
        let sum = 0
        const q = [[1, bags['shiny gold']]]
        while (q.length) {
            const [num, node] = q.shift()

            for (let cstr in node.children) {
                const { num: cnum, node: child } = node.children[cstr]
                sum += num * cnum
                q.push([num * cnum, child])
            }
        }
        result = sum
    }
    console.log(result)
}
