const reg = /<x=(\-?\d+), y=(\-?\d+), z=(\-?\d+)>/;

module.exports = function(part, data) {
    let ps = data.split('\n').map((str) => {
        const [_, x, y, z] = reg.exec(str);
        return {x: +x, y: +y, z: +z, vx: 0, vy: 0, vz: 0};
    });

    for (let step = 0; step < 1000; step++) {
        ps = ps.map((p1, i) => {
            let ax = 0;
            let ay = 0;
            let az = 0;
            ps.forEach((p2, j) => {
                if (i === j) return;

                ax += (p2.x > p1.x) ? 1 : (p2.x < p1.x ? -1 : 0);
                ay += (p2.y > p1.y) ? 1 : (p2.y < p1.y ? -1 : 0);
                az += (p2.z > p1.z) ? 1 : (p2.z < p1.z ? -1 : 0);
            });

            return {
                x: p1.x + p1.vx + ax,
                y: p1.y + p1.vy + ay,
                z: p1.z + p1.vz + az,
                vx: p1.vx + ax,
                vy: p1.vy + ay,
                vz: p1.vz + az
            };
        });
    }

    const result = ps.map(({x, y, z, vx, vy, vz}) => {
        const pot = Math.abs(x) + Math.abs(y) + Math.abs(z);
        const kin = Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
        return {pot, kin};
    })
        .reduce((sum, {pot, kin}) => {
            return sum + pot * kin;
        }, 0);

    console.log(result);
};
