using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModel.APIModelFolder
{
    public class DpsUser : IUser
    {
        public DpsUser() { }
        /// <summary>
        /// Id người dùng
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// Họ lót
        /// </summary>
        public string FirstName { get; set; } = "";
        /// <summary>
        /// Tên
        /// </summary>
        public string LastName { get; set; } = "";
        /// <summary>
        /// Trạng thái (-1: Tên đăng nhập hoặc mật khẩu không hợp lệ, 0: Nhân viên đã thôi việc, 1 là kích hoạt, 2: Hết hạn sử dụng đối với gói khác ngoài gói Trial, 3: Tài khoản đã bị khóa, 4: Hết hạn sử dụng đối với gói Trial)
        /// </summary>
        public int Status { get; set; } = 0;
        /// <summary>
        /// ID khách hàng dps (id nhóm đa người dùng)
        /// </summary>
        public string IDKHDPS { get; set; } = "";
        /// <summary>
        /// Loại người dùng (-1: admin dps; 0: user gốc; 1: user thường)
        /// </summary>
        public int UserType { get; set; } = 0;
        public string FullName { get { return FirstName + " " + LastName; } }

        public string SecurityStamp { get; set; } = "dps";
        public string ErrorMessage { get; set; } = "";
        /// <summary>
        /// Số lần nhập sai mật khẩu
        /// </summary>
        public int SoLuong { get; set; } = 0;
    }

    public class DpsRole : IRole
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class DpsUserStore<T> : IUserStore<T>, IUserRoleStore<T> where T : DpsUser
    {
        void IDisposable.Dispose()
        {
            // throw new NotImplementedException();
        }

        public Task CreateAsync(T user)
        {
            return Task.FromResult(user);
        }

        public Task UpdateAsync(T user)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(T user)
        {
            throw new NotImplementedException();
        }

        public Task<T> FindByIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<T> FindByNameAsync(string userName)
        {
            throw new NotImplementedException();
        }

        public Task AddToRoleAsync(T user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromRoleAsync(T user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task<IList<string>> GetRolesAsync(T user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsInRoleAsync(T user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task SetSecurityStampAsync(T user, string stamp)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetSecurityStampAsync(T user)
        {
            return null;
            //throw new NotImplementedException();
        }
    }
}
