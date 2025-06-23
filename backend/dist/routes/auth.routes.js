"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Ruta de login
router.post('/login', auth_controller_1.loginUser);
// TODO: Implementar la ruta de registro
exports.default = router;
