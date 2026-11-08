//! The operator enums (§2.3): binary, unary and assignment operators,
//! each with its source symbol — the one spelling used by `--ast`,
//! error messages and (later) the interpreter.

/// Binary operators (§2.3). Ordered from lowest to highest precedence.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BinaryOp {
    Or,
    And,
    Eq,
    NotEq,
    Lt,
    Gt,
    LtEq,
    GtEq,
    Add,
    Sub,
    Mul,
    Div,
    Mod,
}

impl BinaryOp {
    /// The source symbol, used by `--ast` and error messages.
    pub fn symbol(self) -> &'static str {
        match self {
            BinaryOp::Or => "||",
            BinaryOp::And => "&&",
            BinaryOp::Eq => "==",
            BinaryOp::NotEq => "!=",
            BinaryOp::Lt => "<",
            BinaryOp::Gt => ">",
            BinaryOp::LtEq => "<=",
            BinaryOp::GtEq => ">=",
            BinaryOp::Add => "+",
            BinaryOp::Sub => "-",
            BinaryOp::Mul => "*",
            BinaryOp::Div => "/",
            BinaryOp::Mod => "%",
        }
    }
}

/// Unary operators (§2.3, precedence 2).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum UnaryOp {
    Not,
    Neg,
    AddrOf,
    Deref,
}

impl UnaryOp {
    pub fn symbol(self) -> &'static str {
        match self {
            UnaryOp::Not => "!",
            UnaryOp::Neg => "-",
            UnaryOp::AddrOf => "&",
            UnaryOp::Deref => "*",
        }
    }
}

/// Assignment operators (§2.3) — statement level only.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AssignOp {
    Set,
    Add,
    Sub,
    Mul,
    Div,
}

impl AssignOp {
    pub fn symbol(self) -> &'static str {
        match self {
            AssignOp::Set => "=",
            AssignOp::Add => "+=",
            AssignOp::Sub => "-=",
            AssignOp::Mul => "*=",
            AssignOp::Div => "/=",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn operator_symbols_match_the_source() {
        assert_eq!(BinaryOp::Or.symbol(), "||");
        assert_eq!(BinaryOp::And.symbol(), "&&");
        assert_eq!(BinaryOp::Eq.symbol(), "==");
        assert_eq!(BinaryOp::Mod.symbol(), "%");
        assert_eq!(UnaryOp::Deref.symbol(), "*");
        assert_eq!(UnaryOp::AddrOf.symbol(), "&");
        assert_eq!(UnaryOp::Not.symbol(), "!");
        assert_eq!(AssignOp::Set.symbol(), "=");
        assert_eq!(AssignOp::Mul.symbol(), "*=");
        assert_eq!(AssignOp::Div.symbol(), "/=");
    }
}
