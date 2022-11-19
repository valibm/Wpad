using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Base;

namespace WPad.Core.Interfaces
{
    public interface IRepository<TEntity> 
        where TEntity : class, IEntity
    {
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> exp = null, params string[] includes);
        Task<List<TEntity>> GetAllOrderedAsync<TOrderBy>(Expression<Func<TEntity,
              TOrderBy>> orderBy, Expression<Func<TEntity, bool>> exp = null, params string[] includes);
        Task<List<TEntity>> GetAllPaginateAsync<TOrderBy>(int page, int size, Expression<Func<TEntity, TOrderBy>> orderBy, 
                                                          Expression<Func<TEntity, bool>> exp = null, 
                                                          params string[] includes);
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> exp = null, params string[] includes);
        Task CreateAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }
}
