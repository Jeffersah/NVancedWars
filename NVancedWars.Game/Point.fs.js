import { Record, Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { class_type, union_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { sign } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";
import { printf, toFail } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/String.js";
import { op_UnaryNegation_Int32 } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Int32.js";
import { ofArray, map } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/List.js";

export class CardinalDirection extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Up", "Down", "Left", "Right"];
    }
}

export function CardinalDirection$reflection() {
    return union_type("NVancedWars.Game.CardinalDirection", [], CardinalDirection, () => [[], [], [], []]);
}

export class Point extends Record {
    "constructor"(_x, _y) {
        super();
        this._x = (_x | 0);
        this._y = (_y | 0);
    }
    Equals(obj) {
        let other;
        const this$ = this;
        let matchResult;
        if (obj instanceof Point) {
            if ((other = obj, (Point__get_x(other) === Point__get_x(this$)) && (Point__get_y(other) === Point__get_y(this$)))) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                return true;
            }
            case 1: {
                return false;
            }
        }
    }
    GetHashCode() {
        const this$ = this;
        return (Point__get_x(this$) ^ (~(Point__get_y(this$) << 1))) | 0;
    }
    "System.IComparable`1.CompareTo2B595"(other) {
        const this$ = this;
        const icmp = (a, b) => sign(a - b);
        const matchValue = icmp(Point__get_x(this$), Point__get_x(other)) | 0;
        return ((matchValue < 0) ? matchValue : ((matchValue > 0) ? matchValue : icmp(Point__get_y(this$), Point__get_y(other)))) | 0;
    }
    CompareTo(obj) {
        const this$ = this;
        if (obj instanceof Point) {
            return this$["System.IComparable`1.CompareTo2B595"](obj) | 0;
        }
        else {
            const clo = toFail(printf("Can\'t compare point to %A"));
            return clo(obj) | 0;
        }
    }
}

export function Point$reflection() {
    return class_type("NVancedWars.Game.Point", void 0, Point, class_type("System.ValueType"));
}

export function Point_$ctor_Z37302880(_x, _y) {
    return new Point(_x, _y);
}

export function Point__get_x(_) {
    return _._x;
}

export function Point__get_y(_) {
    return _._y;
}

export function Point_manhattanLength_Z6571DE3B(a) {
    return Math.abs(Point__get_x(a)) + Math.abs(Point__get_y(a));
}

export function Point_op_Addition_76DC7BA0(a, b) {
    return Point_$ctor_Z37302880(Point__get_x(a) + Point__get_x(b), Point__get_y(a) + Point__get_y(b));
}

export function Point_op_Subtraction_76DC7BA0(a, b) {
    return Point_$ctor_Z37302880(Point__get_x(a) - Point__get_x(b), Point__get_y(a) - Point__get_y(b));
}

export function Point_op_UnaryNegation_Z6571DE3B(a) {
    return Point_$ctor_Z37302880(op_UnaryNegation_Int32(Point__get_x(a)), op_UnaryNegation_Int32(Point__get_y(a)));
}

export function Point_op_Multiply_41EFFC39(a, s) {
    return Point_$ctor_Z37302880(Point__get_x(a) * s, Point__get_y(a) * s);
}

export function Point_op_Multiply_Z3AFE7(s, a) {
    return Point_$ctor_Z37302880(Point__get_x(a) * s, Point__get_y(a) * s);
}

export function Point_getX_Z6571DE3B(a) {
    return Point__get_x(a);
}

export function Point_getY_Z6571DE3B(a) {
    return Point__get_y(a);
}

export function Point_setX(x, a) {
    return Point_$ctor_Z37302880(x, Point__get_y(a));
}

export function Point_setY(y, a) {
    return Point_$ctor_Z37302880(Point__get_x(a), y);
}

export function Point_updateX(f, a) {
    return Point_$ctor_Z37302880(f(Point__get_x(a)), Point__get_y(a));
}

export function Point_updateY(f, a) {
    return Point_$ctor_Z37302880(Point__get_x(a), f(Point__get_y(a)));
}

export function Point_map(fn, a) {
    return Point_$ctor_Z37302880(fn(Point__get_x(a)), fn(Point__get_y(a)));
}

export function Point_fromTuple_Z37302880(x, y) {
    return Point_$ctor_Z37302880(x, y);
}

export function Point_from(x, y) {
    return Point_$ctor_Z37302880(x, y);
}

export function Point_cardinalNeighbors_Z6571DE3B(pt) {
    return map((y) => Point_op_Addition_76DC7BA0(pt, y), Point_get_cardinal());
}

export function Point_fromDirection_ZC2D02E(dir) {
    switch (dir.tag) {
        case 1: {
            return Point_$ctor_Z37302880(0, 1);
        }
        case 2: {
            return Point_$ctor_Z37302880(-1, 0);
        }
        case 3: {
            return Point_$ctor_Z37302880(1, 0);
        }
        default: {
            return Point_$ctor_Z37302880(0, -1);
        }
    }
}

export function Point_nearestCardinalDirection_Z6571DE3B(pt) {
    if (Math.abs(Point__get_x(pt)) >= Math.abs(Point__get_y(pt))) {
        if (Point__get_x(pt) < 0) {
            return new CardinalDirection(2, []);
        }
        else {
            return new CardinalDirection(3, []);
        }
    }
    else if (Point__get_y(pt) < 0) {
        return new CardinalDirection(0, []);
    }
    else {
        return new CardinalDirection(1, []);
    }
}

export function Point_get_cardinal() {
    return ofArray([Point_$ctor_Z37302880(1, 0), Point_$ctor_Z37302880(0, 1), Point_$ctor_Z37302880(-1, 0), Point_$ctor_Z37302880(0, -1)]);
}

export function CardinalDirectionModule_opposite(dir) {
    switch (dir.tag) {
        case 1: {
            return new CardinalDirection(0, []);
        }
        case 2: {
            return new CardinalDirection(3, []);
        }
        case 3: {
            return new CardinalDirection(2, []);
        }
        default: {
            return new CardinalDirection(1, []);
        }
    }
}

