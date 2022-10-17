import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: '無效' });
        } else {
          req.user = decode;
          next();
        }
      });
  } else {
    res.status(401).send({ message: 'Token 無 效' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: '管 理 員 Token 無 效' });
  }
};

export const mailgun = () => 
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>感謝您的購買</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>您的訂單已處理完成</p>
  <h2>訂單: ${order._id} (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
    <thead>
      <tr>
        <td><strong>商品</strong></td>
        <td><strong>數量</strong></td>
        <td><strong align="right">價格</strong></td>
      </tr>
    </thead>
    <tbody>
      ${order.orderItems
        .map(
          (item) => `
            <tr>
              <td>${item.name}</td>
              <td align="center">${item.quantity}</td>
              <td align="right">$ ${item.price.toFixed(2)}</td>
            </tr>
          `
        )
        .join('\n')
      }
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">稅金 : </td>
        <td align="right">$ ${order.itemsPrice.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2">總價 : </td>
        <td align="right">$ ${order.shippingPrice.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2">總價 : </td>
        <td align="right">$ ${order.totalPrice.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2">支付方式 : </td>
        <td align="right">$ ${order.paymentMethod}</td>
      </tr>
    </tfoot>
  </table>
  <h2>收貨地址</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode},<br/>
  </p>
  <hr/>
  <p>感謝您的訂購</p>
  `
};