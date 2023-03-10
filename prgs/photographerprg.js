module.exports = {
  signup: async (req, res) => {
    res.render(process.env.signupverificationhbspage, {
      alert: 'check your mail for verification pin',
      posto: '/photographer/vpin',
    });
  },
};
