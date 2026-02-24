export type SymbolId = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | 'W' | 'S';
export interface InitSessionResponse {
    ok: true;
    sessionId: string;
    balance: number;
}
export interface SpinRequest {
    sessionId: string;
    bet: number;
}
export interface SpinResponse {
    ok: true;
    sessionId: string;
    balance: number;
    bet: number;
    stops: [number, number, number, number, number];
    matrix: [
        [
            SymbolId,
            SymbolId,
            SymbolId
        ],
        [
            SymbolId,
            SymbolId,
            SymbolId
        ],
        [
            SymbolId,
            SymbolId,
            SymbolId
        ],
        [
            SymbolId,
            SymbolId,
            SymbolId
        ],
        [
            SymbolId,
            SymbolId,
            SymbolId
        ]
    ];
    totalWin: number;
}
