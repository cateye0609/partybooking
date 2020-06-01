export class MoneyStatistic {
    total: number;
    count: number;
    _id: string;
}

export class DishStatistic {
    count: number;
    total_plate: number;
    name: string;
    date: string;
}

export class CustomerStatistic {
    _id: string;
    count_bill: number;
    total_money: number;
}
export class StaffStatistic {
    _id: string;
    count_bill: number;
    total_money: number;
}
