class ASM {

    static READ() { return `READ`; }
    static WRITE() { return `WRITE`; }

    static LOAD(register) { return `LOAD ${register}`; }
    static STORE(register) { return `STORE ${register}`; }

    static RST(register) { return `RST ${register}`; }
    static INC(register) { return `INC ${register}`; }
    static DEC(register) { return `DEC ${register}`; }

    static SHL(register) { return `SHL ${register}`; }
    static SHR(register) { return `SHR ${register}`; }

    static PUT(register) { return `PUT ${register}`; }
    static GET(register) { return `GET ${register}`; }

    static ADD(register) { return `ADD ${register}`; }
    static SUB(register) { return `SUB ${register}`; }

    static JUMP(pointIdentifier) { return `JUMP ${pointIdentifier}` }
    static JPOS(pointIdentifier) { return `JPOS ${pointIdentifier}` }
    static JZERO(pointIdentifier) { return `JZERO ${pointIdentifier}` }
    static STRK(register) { return `STRK ${register}`; }
    static JUMPR(register) { return `JUMPR ${register}`; }
    static HALT() { return `HALT`; }
}

module.exports = ASM;